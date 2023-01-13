import React, { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'
import Text from './Text'

interface IColumn {
  title: string
}

interface IRow<T> {
  label: string
  data: IData<T>[]
}

interface IData<T> {
  sortValue: number
  info: T
}

interface IProps<T> {
  anchorFirstColumn?: boolean
  cellWidth?: number
  cellHeight?: number
  columns: IColumn[]
  renderCell(nu: T): React.ReactElement
  rows: IRow<T>[]
}

export default function Table<T>(props: IProps<T>) {
  const { anchorFirstColumn, cellHeight, cellWidth, columns, renderCell, rows } = props
  const theme = usePreemTheme()
  const [sort, setSort] = useState<number>(0)

  const styles = useMemo(() => {
    const height = cellHeight || 40
    const width = cellWidth || 150
    const headerHeight = 50
    return StyleSheet.create({
      container: {},
      rowLabel: {
        height,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
      },
      rowLabelHeader: {
        height: headerHeight,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      column: {
        height,
        width,
        justifyContent: 'center',
      },
      columnHeader: {
        height: headerHeight,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
      },
      columnHeaderSorted: {
        height: headerHeight,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121',
        borderWidth: 1,
        borderColor: '#fff',
        borderStyle: 'solid',
      },
      columnHeaderContainer: {
        flexDirection: 'row',
      },
    })
  }, [cellWidth, theme])

  const sortedRows = useMemo(() => {
    return rows.sort((a, b) => {
      const aVal = a.data[sort]?.sortValue || 0
      const bVal = b.data[sort]?.sortValue || 0
      return bVal - aVal
    })
  }, [rows, sort])

  const onSort = (i: number) => () => {
    setSort(i)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          {anchorFirstColumn && (
            <View>
              <View style={styles.rowLabelHeader}></View>
              {rows.map((row, i) => {
                return (
                  <View key={`labelRow:${i}`} style={styles.rowLabel}>
                    <Text numberOfLines={1} style={{}}>
                      {row.label}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          <ScrollView horizontal>
            <View>
              <View style={styles.columnHeaderContainer}>
                {columns.map((x, i) => {
                  return (
                    <TouchableOpacity style={sort === i ? styles.columnHeaderSorted : styles.columnHeader} key={`column: ${i}`} onPress={onSort(i)}>
                      <Text>{x.title}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              {sortedRows.map((row, i) => {
                return (
                  <View key={`row:${i}`} style={{ flexDirection: 'row' }}>
                    {row.data.map((data, j) => {
                      return (
                        <View key={`data:${j}`} style={styles.column}>
                          {renderCell(data.info)}
                        </View>
                      )
                    })}
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}
