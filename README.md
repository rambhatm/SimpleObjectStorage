# SimpleObjectStorage
A simple object store implemented with existing libraries in nodejs.
Main usage targetted is for inhouse testing of S3 APIs.

Features:
1)GET, POST, DELETE Objects.
2)Similar API to AWS S3

Design:

The object server stores the objects as files on any available filesystem. 
Metadata is optionally stored on flash. Currently metadata is stored
as a file using NEDB. We could deploy memcached+persistence for faster access in the future.

node-formidable is used for fast http file transfers.