const structda = require("./index")

function test(fn, i, o) {
    let x = structda[fn](i)
    if (o === x) return
    throw Error(`${fn} error: ${o} !== ${x}`)
}

test('article', {
    headline: "Article headline",
    image: [
        "article-image-1.png",
        "article-image-2.png"
    ],
    datePublished: "2015-02-05T08:00:00+08:00",
    dateModified: "2015-02-05T08:00:00+08:00"
},
    `{"@context":"https://schema.org","@type":"NewsArticle","headline":"Article headline","image":["article-image-1.png","article-image-2.png"],"datePublished":"2015-02-05T08:00:00+08:00","dateModified":"2015-02-05T08:00:00+08:00"}`
)

test('breadcrumb',
    [{
        name: "Home",
        url: "https://www.example.com/"
    },
    {
        name: "About",
        url: "https://www.example.com/about"
    }
    ],
    `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.example.com/"},{"@type":"ListItem","position":2,"name":"About"}]}`
)

test('FAQ',
    [{
        question: "Example Question",
        answer: "Example Answer"
    },
    {
        question: "Example Question 2",
        answer: "Example Answer 2"
    }
    ],
    `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Example Question","acceptedAnswer":{"@type":"Answer","text":"Example Answer"}},{"@type":"Question","name":"Example Question 2","acceptedAnswer":{"@type":"Answer","text":"Example Answer 2"}}]}`
)

test('logo',
    {
        url: "https://www.example.com",
        logo_url: "https://www.example.com/assets/logo.png"
    },
    `{"@context":"https://schema.org","@type":"Organization","url":"https://www.example.com","logo":"https://www.example.com/assets/logo.png"}`
)