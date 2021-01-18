export class HttpResponse {
    constructor(data = null, isSuccess = false) {
        this.isSuccess = isSuccess;
        this.data = data;
    }
}