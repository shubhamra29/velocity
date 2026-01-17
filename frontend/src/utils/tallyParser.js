import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
})

export function parseTallyMasters(xmlContent) {
    try {
        const jObj = parser.parse(xmlContent)

        // Tally XML Structure usually has ENVELOPE -> BODY -> IMPORTDATA -> REQUESTDATA -> TALLYMESSAGE
        const messages = jObj?.ENVELOPE?.BODY?.IMPORTDATA?.REQUESTDATA?.TALLYMESSAGE || []
        const ledgers = []

        // Normalize array vs single object
        const msgArray = Array.isArray(messages) ? messages : [messages]

        msgArray.forEach(msg => {
            if (msg.LEDGER) {
                ledgers.push({
                    name: msg.LEDGER['@_NAME'],
                    parent: msg.LEDGER.PARENT,
                    openingBalance: msg.LEDGER.OPENINGBALANCE
                })
            }
        })

        return {
            type: 'Master',
            count: ledgers.length,
            data: ledgers
        }

    } catch (e) {
        console.error("Tally Parse Error", e)
        throw new Error("Invalid Tally XML Format")
    }
}

export function parseTallyVouchers(xmlContent) {
    // Logic for Daybook.xml parsing would go here
    // Similar structure but looking for VOUCHER tags
    return { type: 'Voucher', count: 0, data: [] }
}
