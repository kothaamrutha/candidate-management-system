using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class DCandidateController : ControllerBase
{
    private readonly DonationDBContext _context;
    public DCandidateController(DonationDBContext context)
    {
        _context = context;
    }

    // GET: api/DCandidate
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DCandidate>>> GetDCandidate()
    {
        return await _context.DCandidates.ToListAsync();
    }

    // GET: api/DCandidate/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DCandidate>> GetDCandidate(int id)
    {
        var dcandidate = await _context.DCandidates.FindAsync(id);

        if (dcandidate == null)
        {
            return NotFound();
        }

        return dcandidate;
    }

    // PUT: api/DCandidate/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDCandidate(int id, DCandidate dcandidate)
    {
        dcandidate.id = id;

        _context.Entry(dcandidate).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DCandidateExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/DCandidate
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<DCandidate>> PostDCandidate(DCandidate dcandidate)
    {
        _context.DCandidates.Add(dcandidate);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetDCandidate", new { id = dcandidate.id }, dcandidate);
    }

    // DELETE: api/DCandidate/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDCandidate(int? id)
    {
        var dcandidate = await _context.DCandidates.FindAsync(id);
        if (dcandidate == null)
        {
            return NotFound();
        }

        _context.DCandidates.Remove(dcandidate);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool DCandidateExists(int? id)
    {
        return _context.DCandidates.Any(e => e.id == id);
    }
}
