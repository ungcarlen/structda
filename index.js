const schemas = {
    "article": {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "{{headline}}",
        "image": ["{{image}}"],
        "datePublished": "{{datePublished}}",
        "dateModified": "{{dateModified}}"
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

function generate(schema, data) {
    let str = JSON.stringify(schemas[schema])
    let error = false
    str.match(/\{\{(.*?)\}\}/gm)
        .forEach(part => {
            let param = part.replace(/\{/gm, "").replace(/\}/gm, "")
            let val = data[param]
            if (!val) {
                error = true
                return console.error(`Missing "${param}" for ${schema}, only received ${JSON.stringify(data)}`)
            }
            str = str.replace(part, encode(val))
        })
    return error ? "" : str
}

function article(data = {
    headline,
    image,
    datePublished,
    dateModified
}) {
    return generate("article", data)
}

module.exports = {
    article
}