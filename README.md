# radixnode
User Registration
▪ Endpoint: POST /api/auth/register
   User Fields (For registration)
    • Name
        ▪ Required
    • Email
        ▪ Required
        ▪ Should be valid email
    • Password
        ▪ Required
        ▪ Minimum 8 Chars
        ▪ Must have One Capital character, One small character 

Logging in
▪ Endpoint: POST /api/auth/login

Retrieving a List of Products
▪ Endpoint: GET /api/product
    for limit use "limit" variable in req.body
    for offset use "offset" variable in req.body

Retrieving a Specific Product
▪ Endpoint: GET /api/products/:id

 Creating a New Product
▪ Endpoint: POST /api/products

    Product Fields:
    • Name
        ▪ Required
        ▪ Should be an Alphanumeric string
    • Price
        ▪ Required
        ▪ Should be Decimal
    • Description (Optional)
        ▪ Optional
        ▪ Should not be more than 255 Chars 
    • Product Type
        ▪ Required
        ▪ Should be one of the following
    • Print Product
        • Promotional Product
        • Product Image
            ▪ Optional
            ▪ Allow images only

Updating an Existing Product
▪ Endpoint: PUT /api/ products/:id

Deleting a Product
▪ Endpoint: DELETE /api/product/:id