import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Bazaar Administration')
    .items([
      // 1. Render the custom Products document manager link
      S.documentTypeListItem('product').title('Products Inventory'),

      // 2. Render the custom Categories document manager link
      S.documentTypeListItem('category').title('Product Categories'),

      S.divider(),

      // 3. Automatically loop and display any other schemas you register later
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product', 'category'].includes(item.getId()!)
      ),
    ])