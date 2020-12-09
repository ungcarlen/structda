# Structda [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ungcarlen/structda/LICENSE) [![npm version](https://img.shields.io/npm/v/structda.svg?style=flat)](https://www.npmjs.com/package/structda) [![Known Vulnerabilities](https://snyk.io/test/npm/structda/latest/badge.svg)](https://snyk.io/test/npm/structda/latest)

Structured data in application/ld+json format for use in Search Engine Optimisation (SEO) purpose.
- **Dependency free**: no need for external dependencies
- **Internal error handling**: no need to check the returned value for inconsistencies. Check the console for potential errors, not your web page. Data with errors returns an empty string.

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

Using [NPM](https://www.npmjs.com/package/structda)

```
npm install structda
```

or if you prefer [Yarn](https://yarnpkg.com/package/structda)

```
yarn add structda
```

Then in your file, import structda and call any function. Let's again have a look at an article.

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
- [x] [Breadcrumb](#breadcrumb)
- [ ] Carousel
- [ ] Course
- [ ] COVID-19 announcements
- [ ] Critic review
- [ ] Dataset
- [ ] Employer Aggregate Rating
- [ ] Estimated salary
- [ ] Event
- [ ] Fact Check
- [x] [FAQ](#faq)
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

### <a name="breadcrumb"></a> Breadcrumb
A Breadcrumb is simply a list of urls, showing where in the web sites hierarchy a specific web page is positioned. Allowing users to directly go to a parent page enhances the search experience according to [Google's Guidelines for Breadcrumb](https://developers.google.com/search/docs/data-types/breadcrumb).

It is the order in which the objects are given that determine their position. You cannot pass in your own positions. 

The required parameters for a Breadcrumb is an array of objects that contain
- name: string
- url: string (ideally the canonical url), this can be omitted for the last entry

```
const structda = require("structda");

let input = [
    {
        name: "Home",
        url: "https://www.example.com/"
    },
    {
        name: "About"
    }
];

let output = structda.breadcrumb(input);

console.log(output);
```

This logs out the following. By default it is compressed, as a **string**. Here manually formatted to illustrate the returned structure.

```
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.example.com/"
    }, {
        "@type": "ListItem",
        "position": 2,
        "name": "About"
    }]
}
</script>
```


### <a name="faq"></a> FAQ / Frequently Asked Questions

A FAQ may contain one or several frequently asked questions. One web page can contain several script elements with FAQ's. For SEO there is little purpose to try to fit all FAQ's in one call of this function. The only problem is that multiple calls to this function leads to more bytes being sent to the users client when requesting the web page. 

According to [Google's Guidelines for FAQPages](https://developers.google.com/search/docs/data-types/faqpage) there is no AMP-version of FAQ's. Only use FAQ structured data type if it is the web site creator that answers the frequently asked questions. **If your questions and answers are user generated, a Q&A is more appropriate.**

The required parameters for a FAQ is an array of objects that contain
- question: string
- answer: string

The question(s) must be passed into the function as an array.

```
const structda = require("structda");

let input = [{
        question: "Example Question", 
        answer: "Example Answer"
    }, {
        question: "Example Question 2", 
        answer: "Example Answer 2"
    }];

let output = structda.FAQ(input);

console.log(output);
```

This logs out the following. By default it is compressed, as a **string**. Here manually formatted to illustrate the returned structure.

```
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
        "@type": "Question",
        "name": "Example Question",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Example Answer"
        }
    }, {
        "@type": "Question",
        "name": "Example Question 2",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Example Answer 2"
        }
    }]
}
</script>
```