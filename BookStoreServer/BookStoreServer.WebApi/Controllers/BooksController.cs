﻿using BookStoreServer.WebApi.DTOs;
using BookStoreServer.WebApi.Models;
using EntityFrameworkCorePagination.Nuget.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreServer.WebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class BooksController : ControllerBase
{
    private static List<Book> books = new()
    {

    };
    public BooksController()
    {
        books = new();
        for (int i = 0; i < 100; i++)
        {
            var book = new Book()
            {
                Id = i + 1,
                Title = "Kitap" + (i + 1),
                Author = "Yazar" + (i + 1),
                Summary = "",
                CoverImageUrl = "https://picsum.photos/200/300",
                CreateAt = DateTime.Now,
                IsActive = true,
                ISBN = "978-0321125217",
                Price = 5 * (i + 1),
                Quantity = i + 1

            };
            books.Add(book);
        }
    }

    [HttpGet("/{pageNumber}/{pageSize}")]
    public IActionResult GetAll(int pageNumber, int pageSize)
    {
        ResponseDto<List<Book>> response = new();
        response.Data = books
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();


        response.PageNumber = pageNumber;
        response.PageSize = pageSize;
        response.TotalPageCount = (int)Math.Ceiling(books.Count / (double)pageSize);
        response.IsFirstPage = pageNumber == 1;
        response.IsLastPage = pageNumber == response.TotalPageCount;


        return Ok(response);
    }
}
