using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.DTOs;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    [HttpPost]
    public IActionResult Create(CreateCategoryDto request)
    {
        Category category = new()
        {
            Name = request.Name,
            IsActive = true,
            IsDeleted = false
        };
        AppDbContext context = new();
        context.Categories.Add(category);
        context.SaveChanges();
        return NoContent();
    }


    [HttpGet]
    public IActionResult GetAll()
    {
        AppDbContext context = new();
        var categories =
            context.Categories
            .Where(p => p.IsActive == true && p.IsDeleted == false)
            .OrderBy(o => o.Name)
            .ToList();

        return Ok(categories);
    }
}
