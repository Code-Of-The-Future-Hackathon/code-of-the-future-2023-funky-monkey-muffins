type FetchResult<T> = FetchSuccess<T> | FetchError

interface FetchSuccess<T> {
    success: true
    data: T
}

interface FetchError {
    success: false
    errorMessage: string
}
