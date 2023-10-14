import hashlib
import time


def generate_hash():
    hash = hashlib.sha1()
    hash.update(str(time.time()).encode('utf-8'))
    return hash.hexdigest()


def hash_str_to_password(text: str):
    _hash = hashlib.sha256(text.encode('UTF-8'))
    return _hash.hexdigest()
