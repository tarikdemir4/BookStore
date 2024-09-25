namespace BookStoreServer.WebApi.DTOs;

public sealed record RequestDto(
    int PageNumber,
    int PageSize,
    string Search,
    int? categoryId);
