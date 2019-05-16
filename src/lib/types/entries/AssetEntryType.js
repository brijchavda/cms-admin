import { EntryType } from 'src/lib/types/entries/EntryType'
import deepFreeze from 'deep-freeze'

export class AssetEntryType extends EntryType {
  constructor(entry) {
    super(entry)
    deepFreeze(this)
  }

  _getBasicSchema() {
    const schema = super._getBasicSchema()
    schema.properties.value.properties.type = { enum: ['asset'] }
    schema.properties.value.properties.value = { type: 'string', minLength: 1 }

    return schema
  }
}
