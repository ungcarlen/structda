const structda = require("./index")

function test(fn, i, o) {
    let x = structda[fn](i)
    if (o === x) return
    console.error(`${fn} error: ${o} !== ${x}`)
}

test('article', 
    {
        headline: "Article headline",
        image: [
            "article-image-1.png",
            "article-image-2.png"
        ],
        datePublished: "2015-02-05T08:00:00+08:00",
        dateModified: "2015-02-05T08:00:00+08:00"
    }, 
    `<script type="application/ld+json">{"@context":"https://schema.org","@type":"NewsArticle","headline":"Article headline","image":["article-image-1.png","article-image-2.png"],"datePublished":"2015-02-05T08:00:00+08:00","dateModified":"2015-02-05T08:00:00+08:00"}</script>`
)
