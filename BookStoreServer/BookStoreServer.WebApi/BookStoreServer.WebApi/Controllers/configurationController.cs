using BookStoreServer.WebApi.Context;
using BookStoreServer.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class configurationController : ControllerBase
{
    private readonly AppDbContext context = new();
    [HttpGet]
    public IActionResult SeedData()
    {
        List<Book> books = new();
        for (int i = 0; i < 10000; i++)
        {
            var book = new Book()
            {
                Title = "Book " + (i + 1),
                Author = " Author " + (i + 1),
                Summary = "Summary " + (i + 1),
                CoverImageUrl = "https://picsum.photos/200/300",
                Price = new(i * 2, "₺"),
                Quantity = i * 1,
                IsActive = true,
                IsDeleted = false,
                ISBN = "ISBN " + (i + 1),
                CreateAt = DateTime.Now,


            };
            books.Add(book);
        }
        context.Books.AddRange(books);
        context.SaveChanges();


        List<Category> categories = context.Categories.ToList();

        List<BookCategory> bookCategories = new();
        foreach (var book in books)
        {
            var bookCategory = new BookCategory()
            {
                BookId = book.Id,
                CategoryId = categories[new Random().Next(0, categories.Count)].Id
            };

            bookCategories.Add(bookCategory);
        }

        context.BookCategories.AddRange(bookCategories);

        context.SaveChanges();

        return NoContent();
    }
}
