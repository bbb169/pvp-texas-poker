import React from 'react';
import { DndContext, useSensor, useSensors, DragEndEvent, TouchSensor, MouseSensor } from '@dnd-kit/core';
import { SortableContext,
    arrayMove,
    useSortable,
    horizontalListSortingStrategy, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';

interface DataType {
  key: string;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props['data-row-key'] });
  
    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
  
    return <div {...props} ref={setNodeRef} style={style} {...attributes}
        {...listeners}>{props.children}</div>;
};

function DragableItem<T extends DataType> ({ dataSource, renderFunc, setDataSource } : { 
  dataSource: T[], 
  renderFunc: (data: T) => JSX.Element, 
  setDataSource: (datas: (datas: T[]) => T[]) => void 
}) {
    const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 1 } }), useSensor(TouchSensor, { activationConstraint: { distance: 1 } }));

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setDataSource((prev: T[]) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    return (
        <DndContext 
            sensors={sensors}
            modifiers={[restrictToParentElement]}
            onDragEnd={onDragEnd}>
            <SortableContext
                // rowKey array
                items={dataSource.map((i) => i.key)}
                strategy={horizontalListSortingStrategy}
            >
                {
                    dataSource.map(item => <Row data-row-key={item.key} key={item.key}>{renderFunc(item)}</Row>)
                }
            </SortableContext>
        </DndContext>
    );
}

export default DragableItem;