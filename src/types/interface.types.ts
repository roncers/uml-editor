export const attributeType = {
    int: 'int',
    string: 'string',
    boolean: 'boolean',
    float: 'float',
    double: 'double',
    char: 'char',
    long: 'long',
    short: 'short',
    byte: 'byte',
    void: 'void',
    any: 'any'
} as const;
export type AttributeType = typeof attributeType[keyof typeof attributeType];

export const attributeVisibility = {
    public: 'public',
    private: 'private'
} as const;
export type AttributeVisibility = typeof attributeVisibility[keyof typeof attributeVisibility];

export const relationshipType = {
    dependency: 'dependency',
    association: 'association',
    aggregation: 'aggregation',
    composition: 'composition',
    implementation: 'implementation',
    inheritance: 'inheritance'
} as const;
export type RelationshipType = typeof relationshipType[keyof typeof relationshipType];