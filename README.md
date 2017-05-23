# SimpleObjectStorage
A simple object store that satisfies some of the general object store expectations

Operations :

1)GET (URL/:KEY)

READ the object from BUCKET for the specified KEY

2)POST (URL/)

WRITE new object for a given key. Formdata with following
file : single file to be uploaded
key : key for a given file


3)DELETE (URL/BUCKET/KEY)

DELETE object from BUCKET for the specified KEY
