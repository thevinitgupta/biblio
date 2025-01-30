export interface BookSearchResponse {
    items : Array<Book>
}

export interface Book {
    id : string,
    volumeInfo ? : {
        title : string,
        subtitle ? : string,
        authors : Array<string>,
        publishedDate : string,
        industryIdentifiers : Array<IndustryIdentifier>,
        imageLinks : ImageLinks
    },
    bookInfo ? : {
        title : string,
        subtitle ? : string,
        authors : Array<string>,
        publishedDate : string,
        industryIdentifiers : Array<IndustryIdentifier>,
        imageLinks : ImageLinks
    }
}

export interface IndustryIdentifier{
    type : string,
    identifier : string
}

export interface ImageLinks{
    smallThumbnail : string,
    thumbnail : string
}