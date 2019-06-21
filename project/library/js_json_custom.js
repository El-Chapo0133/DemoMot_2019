class js_json_custom {
    createJson(string) {
        return JSON.parse(string)
    }
    createString(json) {
        return JSON.stringify(json)
    }
    getValue(jsonAccessKey) {
        if (jsonAccessKey) {
            return jsonAccessKey
        } else {
            return "not defined or accessible | cannot access " + String(jsonAccessKey)
        }
    }
    uptadeValue(jsonAccessKey, data) {
        if (jsonAccessKey) {
            jsonAccessKey = data
        } else {
            return "not defined or accessible | cannot update " + String(jsonAccessKey)
        }
    }
}