/**
 * Interface for pagination details.
 */
export interface IPaginationQueryParameters {
    /**
     * The current page number.
     */
    page: number;

    /**
     * The number of results per page. Max 100 results.
     */
    per_page: number;
}