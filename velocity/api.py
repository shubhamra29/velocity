import frappe
from frappe import _

@frappe.whitelist()
def save_voucher(doc):
    """
    Whitelisted RPC for saving vouchers from the headless frontend.
    This acts as the 'System's Truth' validator.
    """
    if isinstance(doc, str):
        doc = frappe.parse_json(doc)
    
    # Placeholder for actual ERPNext/HRMS logic
    # In a real scenario, this would create a Journal Entry, Sales Invoice, etc.
    
    # Simple validation as an example
    if not doc.get('items'):
        frappe.throw(_("Items are mandatory"))
        
    # Return success response with metadata
    return {
        "status": "success",
        "message": _("Voucher saved successfully"),
        "name": "NEW-VOUCHER-001" # Mock name
    }

@frappe.whitelist()
def get_master_data():
    """
    Compressed RPC for fetching master data for IndexedDB caching.
    """
    return {
        "accounts": frappe.get_all("Account", fields=["name", "account_type", "balance"]),
        "items": frappe.get_all("Item", fields=["name", "item_name", "stock_uom"]),
        "tax_templates": frappe.get_all("Sales Taxes and Charges Template", fields=["name"])
    }
