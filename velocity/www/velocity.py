import frappe

def get_context(context):
    context.no_cache = 1
    context.boot = frappe.sessions.get_expiry_in_seconds()
