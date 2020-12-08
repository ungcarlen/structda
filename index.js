const schemas = {
    "article": {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "{{headline}}",
        "image": ["{{image}}"],
        "datePublished": "{{datePublished}}",
        "dateModified": "{{dateModified}}"
    },
    "breadcrumb": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": "{{n}}",
            "name": "{{name}}",
            "item": "{{url}}"
        }]
    },
    "FAQ": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "{{question}}",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "{{answer}}"
            }
        }]
    }
}

function encode(x) {
    if (Array.isArray(x)) {
        return x.map(y => {
            return encode(y)
        }).join("\",\"")
    }
    if (typeof x.getMonth === 'function') {
        x = x.toISOString()
    }
    if (typeof x !== "string") {
        return x
    }
    return x.replace(/\"/gm, "'")
}

function repl(str, part, val) {
    if (part === "{{n}}") {
        part = `"{{n}}"`
    }
    return str.replace(part, encode(val))
}

function generate(type, data, array = null) {
    let schema = schemas[type]
    if (array) {
        let item = schema[array][0]
        schema[array] = data.map(() => {
            return item
        })
    }
    let str = JSON.stringify(schemas[type])
    let error = false
    str.match(/\{\{(.*?)\}\}/gm)
        .forEach(part => {
            if (array) {
                data.forEach(item => {
                    let param = part.replace(/\{/gm, "").replace(/\}/gm, "")
                    let val = item[param]
                    if (!val) {
                        error = true
                        return console.error(`Missing "${param}" for ${type}, only received ${JSON.stringify(data)}`)
                    }
                    str = repl(str, part, val)
                })
                return
            }

            let param = part.replace(/\{/gm, "").replace(/\}/gm, "")
            let val = data[param]
            if (!val) {
                error = true
                return console.error(`Missing "${param}" for ${type}, only received ${JSON.stringify(data)}`)
            }
            str = repl(str, part, val)
        })
    return error ? "" : `<script type="application/ld+json">${str}</script>`
}

function article(data = {
    headline,
    image,
    datePublished,
    dateModified
}) {
    return generate("article", data)
}

function breadcrumb(data = [{
    name,
    url
}]) {
    for (let i = 0; i < data.length; i++) {
        data[i].n = i + 1
    }
    return generate("breadcrumb", data, "itemListElement")
}

function FAQ(data = [{
    question,
    answer
}]) {
    return generate("FAQ", data, "mainEntity")
}

module.exports = {
    article,
    breadcrumb,
    FAQ
}