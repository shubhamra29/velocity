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
def save_employee(doc):
    """
    Mock endpoint to save employee data.
    """
    if isinstance(doc, str):
        doc = frappe.parse_json(doc)
    
    # In reality, this would save to 'Employee' doctype
    return {
        "status": "success",
        "message": _("Employee saved successfully"),
        "id": "EMP-2023-00X"
    }

@frappe.whitelist()
def get_home_summary():
    """
    Returns summary data for the home page.
    """
    return {
        "vouchers_today": 12,
        "pending_sync": 2,
        "recent_activity": [
            {"id": "JV-001", "type": "Journal", "amount": 4500, "status": "Synced"},
            {"id": "PAY-004", "type": "Payment", "amount": 1200, "status": "Pending"},
            {"id": "REC-002", "type": "Receipt", "amount": 800, "status": "Synced"},
        ]
    }

@frappe.whitelist()
def get_master_data():
    """
    Compressed RPC for fetching master data for IndexedDB caching.
    """
    return {
        "accounts": frappe.get_all("Account", fields=["name", "account_type"]),
        "items": frappe.get_all("Item", fields=["name", "item_name", "stock_uom"]),
        "tax_templates": frappe.get_all("Sales Taxes and Charges Template", fields=["name"])
    }
