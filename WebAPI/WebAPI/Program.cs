using Microsoft.AspNetCore.Mvc;

namespace WebAPI
{
    public class Film
    {
        public int Id { get; set; }
        public string Tytul { get; set; } = string.Empty;
        public decimal Cena { get; set; }
        public DateTime DataPremiery { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class FilmsController : ControllerBase
    {
        private static readonly List<Film> _films = new List<Film>
        {
            new Film { Id = 1, Tytul = "asdasd", Cena = 123123, DataPremiery = new DateTime(2000, 01, 01) }
        };

        [HttpGet]
        public IActionResult Get(string? tytul, int? limit, int? start)
        {
            var query = _films.AsQueryable();

            if (!string.IsNullOrWhiteSpace(tytul))
            {
                query = query.Where(f => f.Tytul.Contains(tytul, StringComparison.OrdinalIgnoreCase));
            }

            int skipCount = start ?? 0;
            int takeCount = limit ?? 10;

            var wynik = query
                .Skip(skipCount)
                .Take(takeCount)
                .ToList();

            return Ok(wynik);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Film nowyFilm)
        {
            if (nowyFilm == null) return BadRequest();

            nowyFilm.Id = _films.Count > 0 ? _films.Max(f => f.Id) + 1 : 1;
            _films.Add(nowyFilm);

            return CreatedAtAction(nameof(Get), new { id = nowyFilm.Id }, nowyFilm);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Film edytowanyFilm)
        {
            var istniejacyFilm = _films.FirstOrDefault(f => f.Id == id);

            if (istniejacyFilm == null)
            {
                return NotFound($"Nie znaleziono filmu");
            }

            istniejacyFilm.Tytul = edytowanyFilm.Tytul;
            istniejacyFilm.Cena = edytowanyFilm.Cena;
            istniejacyFilm.DataPremiery = edytowanyFilm.DataPremiery;

            return Ok(true);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var istniejacyFilm = _films.FirstOrDefault(f => f.Id == id);

            if (istniejacyFilm == null)
            {
                return NotFound($"Nie znaleziono filmu");
            }

            _films.Remove(istniejacyFilm);

            return Ok(true);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class TimerController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { 
            return Ok(DateTime.Now.Second);
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            const string POLICY = "CORS";

            builder.Services.AddCors(options =>
            {

                options.AddPolicy(POLICY,
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4114")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(POLICY);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}