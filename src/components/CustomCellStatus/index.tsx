'use client'

import { useState } from 'react'
import { SelectInput } from '@payloadcms/ui'
import { DefaultCellComponentProps, SelectFieldClient } from 'payload'
import { Option } from '@payloadcms/ui/elements/ReactSelect'

const CustomCellStatus = (props: DefaultCellComponentProps<SelectFieldClient>) => {
  const [value, setValue] = useState<string>(props.cellData)

  async function updateDocument(newStatus: string) {
    setValue(newStatus)

    const resp = await fetch(`/api/custom-type/${props.rowData.id}/set-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!resp.ok) {
      setValue(value)
      throw new Error('Request failed')
    }
  }

  return (
    <div style={{ height: 160 }}>
      <SelectInput
        name={props.field.name}
        path=""
        value={value}
        isClearable={false}
        options={props.field.options.map((s) => ({ label: s as string, value: s as string }))}
        onChange={(v) => updateDocument((v as Option<string>).value)}
      />
    </div>
  )
}

export default CustomCellStatus
