export enum PriorityEnum {
  LOW = 'low',
  MEDIUM= 'medium',
  HIGH = 'high'
}

export const PriorityEnumLabel = new Map<PriorityEnum, string>([
  [ PriorityEnum.HIGH, 'Alta' ],
  [ PriorityEnum.MEDIUM, 'Média' ],
  [ PriorityEnum.LOW, 'Baixa' ]
])

export const PriorityTypeOptions = Array.from(PriorityEnumLabel).map(type => ({
  id: type[0],
  label: type[1]
}));
