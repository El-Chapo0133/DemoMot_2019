class js_json_custom {
    static createJson(string) {
        return JSON.parse(string)
    }
    static createString(json) {
        return JSON.stringify(json)
    }
}