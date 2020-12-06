# Structda

## Introduction

**structda** is a work in progress. The goal is to unify the inclusion of structured data in any [NodeJS](https://nodejs.org/en/) based project, structured according to [Google's Guidelines](https://developers.google.com/search/docs/guides/intro-structured-data). Simple functions to generate valid structured data.


If the input data isn't valid, **structda** outputs error messages in the console but return an empty string as a value. Why? We always want the web page to have valid markup. If the structured data isn't valid, it shouldn't exist on the web page. Debugging should always be done in a controlled environment, i.e. not visible on the world wide web. 

Valid input is returned as a string structured as **application/ld+json**. It's only the actual string that is returned, i.e. you need to place this in a script element on your web page.

The fundamental idea when developing this project is that it should be **completely dependency free** and that **all error handling should be internal**. No invalid structured data should be returned when any function is called.

## What does this project do?

The origin of this project is to simplify the implementation of structured data used within a script element according to the **application/ld+json** structure according to [Google's Guidelines for Advanced SEO](https://developers.google.com/search/docs/advanced/guidelines/get-started). 

If you have a web page that contains any of the implemented types, you can simply call the appropriate function with your data and have valid structured data returned. Ready to use.

Let's have a look at a news article to illustrate what the project does. Currently, the non-AMP version of structured data only requires *headline*, *image*, *datePublished* and *dateModified* according to [Google's Guidelines](https://developers.google.com/search/docs/data-types/article).

```
const structda = require("structda");

let input = {
    headline: "Article headline",
    image: [
        "article-image-1.png",
        "article-image-2.png"
    ],
    datePublished: "2015-02-05T08:00:00+08:00",
    dateModified: "2015-02-05T08:00:00+08:00"
};

let output = structda.article(input);

console.log(output);
```

This logs out the following. By default it is compressed, as a **string**. Here manually formatted to illustrate the returned structure.

```
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Article headline",
    "image": [
        "article-image-1.png", 
        "article-image-2.png"
    ],
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T08:00:00+08:00"
}
</script>
```

Running the example above, we can see what the output of the article function is. Valid structured data in **application/ld+json** format. You input a object of data, and if your data is valid for the given structured data type, you receive valid schema in return.

## Why is this project useful?

Reading documentation, implementing and testing any structured data types takes time and effort. Personally, this project is aimed to be used in several minor web sites to simplify the implementation of structured data for search engine optimization reasons. 

Using this project, you will **hopefully** be guaranteed to have valid structured data or none at all. What you get rid of is never having to validate your data, giving you more time to do other stuff. All required fields for any given structured data type are explicitly defined as required parameters of the function. I.e. when adding previously unknown structured data type you may only need to refer to what is required to be passed into the specific function.

## How do I get started?

First of, you should install the package in your local project.

```
npm install structda
```

Then in your file, require structda and call any function. Let's again have a look at an article.

```
const structda = require("structda");

let input = {
    headline: "Article headline",
    image: [
        "article-image-1.png",
        "article-image-2.png"
    ],
    datePublished: "2015-02-05T08:00:00+08:00",
    dateModified: "2015-02-05T08:00:00+08:00"
};

let output = structda.article(input);

console.log(output);
```

This logs out the following. By default it is compressed, as a **string**. Here manually formatted to illustrate the returned structure.

```
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Article headline",
    "image": [
        "article-image-1.png", 
        "article-image-2.png"
    ],
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T08:00:00+08:00"
}
</script>
```

## Structured data types

- [x] [Article](#article)
- [ ] Book
- [ ] Breadcrumb
- [ ] Carousel
- [ ] Course
- [ ] COVID-19 announcements
- [ ] Critic review
- [ ] Dataset
- [ ] Employer Aggregate Rating
- [ ] Estimated salary
- [ ] Event
- [ ] Fact Check
- [ ] FAQ
- [ ] Home Activities
- [ ] How-to
- [ ] Image License
- [ ] Job Posting
- [ ] Job Training
- [ ] Local Business
- [ ] Logo
- [ ] Movie
- [ ] Product
- [ ] Q&A
- [ ] Recipe
- [ ] Review snippet
- [ ] Sitelinks search box
- [ ] Software App
- [ ] Speakable
- [ ] Subscription and paywalled content
- [ ] Video


### <a name="article"></a>Article
The article structured data has both AMP and non-AMP versions. A page that only have the non-AMP version of artice structured data may only help Google understand the web page content in a better way, showing more relevant headline, images and dates for article types in the rich results according to [Google's Guidelines for Article structured data](https://developers.google.com/search/docs/data-types/article).

The required parameters are 
- headline: string
- image: array of urls to one or several images
- datePublished: Date object or string in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
- dateModified: Date object or string in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

```
const structda = require("structda");

let input = {
    headline: "Article headline",
    image: [
        "article-image-1.png",
        "article-image-2.png"
    ],
    datePublished: "2015-02-05T08:00:00+08:00",
    dateModified: "2015-02-05T08:00:00+08:00"
};

let output = structda.article(input);

console.log(output);
```

This logs out the following. By default it is compressed, as a **string**. Here manually formatted to illustrate the returned structure.

```
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Article headline",
    "image": [
        "article-image-1.png", 
        "article-image-2.png"
    ],
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T08:00:00+08:00"
}
</script>
```