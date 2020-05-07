

export default class CommonUtils {

    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}