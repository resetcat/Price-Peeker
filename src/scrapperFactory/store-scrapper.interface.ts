interface StoreScraper {
  scrapeProducts(query: string, page: number): Promise<any>;
}
