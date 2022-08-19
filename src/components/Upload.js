// import React, { useState } from 'react';
// import 'antd/dist/antd.css';
// import './index.css';
// import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';


// const dropZone = () => {
//   const [fileList, setFileList] = useState(fileList)
// //     [
// //     {
// //       uid: '-1',
// //       name: 'image.png',
// //       status: 'done',
// //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
// //     },
// //   ]);

//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const onPreview = async (file) => {
//     let src = file.url;

//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);

//         reader.onload = () => resolve(reader.result);
//       });
//     }

//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   return (
//     <ImgCrop rotate>
//       <Upload
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList.length < 2 && '+ Upload'}
//       </Upload>
//     </ImgCrop>
//   );
// };

// export default App;



import React, { useCallback, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Tooltip, Upload } from 'antd';
import update from 'immutability-helper';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const type = 'DragableUploadList';

const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
  const ref = useRef(null);
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
      style={{
        cursor: 'move',
      }}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};

const App = () => {
  const [fileList, setFileList] = useState([])
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [fileList],
  );

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={fileList}
        onChange={onChange}
        itemRender={(originNode, file, currFileList) => (
          <DragableUploadListItem
            originNode={originNode}
            file={file}
            fileList={currFileList}
            moveRow={moveRow}
          />
        )}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </DndProvider>
  );
};

export default App;
