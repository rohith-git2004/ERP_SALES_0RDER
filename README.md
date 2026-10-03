# sales-frontend

ERP Sales Order frontend built from the supplied reference screens.

## Routes
- `/sales-order` — Sales Order landing page
- `/new-order` — separate New Order page
- `/working` — temporary page for unfinished destinations
- `/review-order` — Review Order/list view with Save
- `/saved-draft` — Saved Draft view with Edit

## Required behavior
- Add and New Order both open `/new-order`.
- My Orders, List, My Sales, New Receipt and Deliveries open `/working`.
- Route Plan has five dummy values: Dubai, Abu Dhabi, Saudi, India, Qatar.
- Product data contains five dummy products including Pants and Shirt.
- Voucher Type contains only Voucher Receipt; selecting it fills Voucher Number automatically.
- Review order opens the order/list view with Save.
- Save draft opens the saved-draft state with Edit.
- No backend/API/database is used.
