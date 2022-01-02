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
    },
    "logo": {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "{{url}}",
        "logo": "{{logo_url}}"
    }
}

function encode(x) {
    if (Array.isArray(x)) {
        // recursive encoding
        return x.map(y => {
            return encode(y)
        }).join("\",\"")
    }
    if (typeof x.getMonth === 'function') {
        // is x is a Date, convert to ISO string
        x = x.toISOString()
    }
    if (typeof x !== "string") {
        // return without replacing if not string
        // used for true numbers
        return x
    }
    return x.replace(/\"/gm, "'")
}

function repl(str, part, val) {
    if (part === "{{n}}") {
        // replace the quotation marks
        // to create a proper number
        part = `"{{n}}"`
    }
    // return the full string
    // where we have replaced the part
    // with the encoded value
    return str.replace(part, encode(val))
}

function generate(type, data, notLast = []) {
    if (!Array.isArray(data)) {
        // create an array of data if not
        data = [data]
    }

    let schema = schemas[type]

    // used to exclude required parameters
    let excludes = []

    Object.entries(schema).forEach((entry) => {
        // restructure the schema
        if (Array.isArray(entry[1]) && typeof entry[1][0] !== "string") {
            // if the entry value is an array of objects
            let item = entry[1][0]
            for (let i = 0; i < data.length; i++) {
                if (i === data.length - 1) {
                    // if last object in array
                    // copy the item object
                    let lastItem = {
                        ...item
                    }
                    for (let j = 0; j < notLast.length; j++) {
                        // remove undesired parameters from
                        // the last object in the array
                        // and add to exclusion list
                        if (excludes.indexOf(lastItem[notLast[j]]) < 0) {
                            excludes.push(lastItem[notLast[j]])
                        }
                        delete lastItem[notLast[j]]
                    }
                    entry[1][i] = lastItem
                    // "early" exit
                    continue
                }
                entry[1][i] = item
            }
        }
        schema[entry[0]] = entry[1]
    })

    // compress the schema
    let str = JSON.stringify(schemas[type])

    let error = false

    str.match(/\{\{(.*?)\}\}/gm)
        .forEach(part => {
            for (let i = 0; i < data.length; i++) {
                if (i === data.length - 1 && excludes.indexOf(part) >= 0) {
                    // continue to next iteration
                    // if last value and part is in excludes
                    // i.e. shouldn't be set on the last object
                    return
                }

                let param = part.replace(/\{/gm, "").replace(/\}/gm, "")
                let item = data[i]
                let val = item[param]

                if (!val) {
                    // set error to true if a value is missing
                    error = true
                    // log out the error and exit this iteration
                    console.error(`Missing "${param}" for ${type}, only received ${JSON.stringify(data)}`)
                    return
                }

                str = repl(str, part, val)
            }
        })

    // return an empty string if any errors
    // otherwise, return the full structure
    return error ? "" : str
}

function article(data = {
    headline,
    image: [
        url
    ],
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
        // add the position
        data[i].n = i + 1
    }
    return generate("breadcrumb", data, notLast = ['item'])
}

function FAQ(data = [{
    question,
    answer
}]) {
    return generate("FAQ", data)
}

function logo(data = {
    url,
    logo_url
}) {
    return generate("logo", data)
}

module.exports = {
    article,
    breadcrumb,
    FAQ,
    logo
}