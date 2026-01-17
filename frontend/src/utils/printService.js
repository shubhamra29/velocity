export function usePrintService() {

    function generateThermalReceipt(voucher, companyName = "Velocity Corp") {
        // ESC/POS-like text formatting
        let text = ""
        const line = "--------------------------------\n"

        text += String(companyName).center(32) + "\n"
        text += String("Tax Invoice").center(32) + "\n"
        text += line
        text += `No: ${voucher.header.name || 'NEW'}\n`
        text += `Date: ${new Date().toLocaleDateString()}\n`
        text += line

        text += "Item             Qty   Price   Amt\n"
        text += line

        voucher.items.forEach(item => {
            const name = (item.item || item.account || 'Item').substring(0, 15).padEnd(16)
            const qty = String(item.qty || 1).padStart(3)
            const rate = String(item.rate || item.debit || 0).padStart(7)
            const amt = String((item.qty || 1) * (item.rate || item.debit || 0)).padStart(6)
            text += `${name}${qty}${rate}${amt}\n`
        })

        text += line
        text += `Total: Rs. ${calculateTotal(voucher)}\n`
        text += line
        text += String("Thank You!").center(32) + "\n"

        return text
    }

    function calculateTotal(voucher) {
        return voucher.items.reduce((acc, item) => acc + (Number(item.debit) || Number(item.amount) || 0), 0)
    }

    function print(content) {
        const win = window.open('', 'PrintWindow', 'width=400,height=600')
        win.document.write(`<pre style="font-family: monospace; font-size: 12px; white-space: pre-wrap;">${content}</pre>`)
        win.document.close()
        win.focus()
        win.print()
        win.close()
    }

    return {
        generateThermalReceipt,
        print
    }
}

// Polyfill for center for old browsers if needed (simplified)
String.prototype.center = function (width) {
    const len = this.length;
    if (len >= width) return this;
    const left = Math.floor((width - len) / 2);
    return " ".repeat(left) + this;
}
