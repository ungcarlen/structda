const schemas = {
    "article": {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "{{headline}}",
        "image": ["{{image}}"],
        "datePublished": "{{datePublished}}",
        "dateModified": "{{dateModified}}"
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
    return x.replace(/\"/gm, "'")
}

function repl(str, part, param, val) {
    if (!val) {
        error = true
        return console.error(`Missing "${param}" for ${type}, only received ${JSON.stringify(data)}`)
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
                    str = repl(str, part, param, val)
                })
                return
            }
            
            let param = part.replace(/\{/gm, "").replace(/\}/gm, "")
            let val = data[param]
            str = repl(str, part, param, val)
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

function FAQ(data = [{
    question,
    answer
}]) {
    return generate("FAQ", data, "mainEntity")
}

module.exports = {
    article,
    FAQ
}