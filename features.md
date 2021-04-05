Able to login/register
Able to search photos
User:
    Can Add photo to his bucket
    Remove photo from bucket
    Can add to his favourites

    Schema:
        name
        email
        photo
        joinedOn
        collections

Bucket:
    Three types:
        1. Public with link only
        2. Public without link / Listed in the collections
        3. Private (Only owner)

    Schema:
        name
        slug
        bucket_type: [public, private]
        canBeListed: false
        photos: [photoUrls]
        bucketOwnerEmail
