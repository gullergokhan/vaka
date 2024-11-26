# Response Standarilization

Type1: Error messages with:
```bash
  {"error": "User already exist with same email"}
```

Type2: Other messages with:
```bash
  {"message": "Success"}
```

Type3: Data with:
```bash
  response_data = {"data": []}
  response_data["data"].append(data_content)
```

  data_content example1:
```bash
    personel_profile
```

  data_content example2:
```bash
    {"is_active": is_active_value}
```

  data_content example3:
  ```bash
    {
        "id": user.id,
        "profile_id": personel_profile.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "photo": personel_profile.photo.path if personel_profile.photo else "",
        "introduction": personel_profile.introduction,
        "user_role": user.user_role,
        "user_type": user.user_type,
    }
```
