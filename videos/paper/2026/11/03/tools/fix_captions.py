import json

with open('src/videos/paper/03-11-26/captions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 0: 'Bạn mới nghĩ' -> 'Bạn mới nghỉ'
data[0]['text'] = 'Bạn mới nghỉ'
data[0]['words'][2]['text'] = 'nghỉ'

# 3: 'đã báo tính' -> 'đã báo tin'
data[3]['text'] = 'đã báo tin'
data[3]['words'][2]['text'] = 'tin'

# 4: 'nhắn liên tục,' -> 'nhắn liên tục:'
data[4]['text'] = 'nhắn liên tục:'
data[4]['words'][2]['text'] = 'tục:'

# 5: 'vai ở đâu' -> '“File ở đâu'
data[5]['text'] = '“File ở đâu'
data[5]['words'][0]['text'] = '“File'

# 6: 'anh, khách chút' -> 'anh?”, “Khách chốt'
data[6]['text'] = 'anh?”, “Khách chốt'
data[6]['words'][0]['text'] = 'anh?”,'
data[6]['words'][1]['text'] = '“Khách'
data[6]['words'][2]['text'] = 'chốt'

# 7: 'chú trì, việc' -> 'chưa chị?”, “Việc'
data[7]['text'] = 'chưa chị?”, “Việc'
data[7]['words'][0]['text'] = 'chưa'
data[7]['words'][1]['text'] = 'chị?”,'
data[7]['words'][2]['text'] = '“Việc'

# 9: 'làm.' -> 'làm?”'
data[9]['text'] = 'làm?”'
data[9]['words'][0]['text'] = 'làm?”'

# 11: 'độ phần mềm,' -> 'đủ phần mềm,'
data[11]['text'] = 'đủ phần mềm,'
data[11]['words'][0]['text'] = 'đủ'

# 18: 'trong zalo, báo' -> 'trong Zalo, báo'
data[18]['text'] = 'trong Zalo, báo'
data[18]['words'][1]['text'] = 'Zalo,'

# 20: 'e -mail còn' -> 'email, còn'
# combine 'e' (400-404) and '-mail' (404-412) into 'email,' (400-412)
data[20]['text'] = 'email, còn'
data[20]['words'] = [
    {
        'text': 'email,',
        'start': data[20]['words'][0]['start'],
        'end': data[20]['words'][1]['end'],
        'start_frame': data[20]['words'][0]['start_frame'],
        'end_frame': data[20]['words'][1]['end_frame']
    },
    data[20]['words'][2]
]

# 23: 'bạn khác,' -> 'bảng khác,'
data[23]['text'] = 'bảng khác,'
data[23]['words'][0]['text'] = 'bảng'

# 29: 'ở đâu.' -> 'từ đâu.'
data[29]['text'] = 'từ đâu.'
data[29]['words'][0]['text'] = 'từ'

# 30: 'Thứ bắt đầu' -> 'Thử bắt đầu'
data[30]['text'] = 'Thử bắt đầu'
data[30]['words'][0]['text'] = 'Thử'

# 34: 'biết và cùng' -> 'biết vào cùng'
data[34]['text'] = 'biết vào cùng'
data[34]['words'][1]['text'] = 'vào'

# 41: 'Đến lúc chiến' -> 'Đến lúc triển'
data[41]['text'] = 'Đến lúc triển'
data[41]['words'][2]['text'] = 'triển'

# 42: 'khai, đội diễn' -> 'khai, đội dự án'
data[42]['text'] = 'khai, đội dự án'
data[42]['words'][2]['text'] = 'dự án'

# 45: 'mùi sơ đó' -> 'hồ sơ đó'
data[45]['text'] = 'hồ sơ đó'
data[45]['words'][0]['text'] = 'hồ'

# 50: 'người khỏi khách' -> 'người hỏi khách'
data[50]['text'] = 'người hỏi khách'
data[50]['words'][1]['text'] = 'hỏi'

# 51: 'chút tới đâu,' -> 'chốt tới đâu,'
data[51]['text'] = 'chốt tới đâu,'
data[51]['words'][0]['text'] = 'chốt'

# 60 & 68: 'lời từng tinh' -> 'lời từng tin'
data[60]['text'] = 'lời từng tin'
data[60]['words'][2]['text'] = 'tin'

data[68]['text'] = 'lời từng tin'
data[68]['words'][2]['text'] = 'tin'

with open('src/videos/paper/03-11-26/captions.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Captions updated successfully!")
