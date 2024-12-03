'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Item Types
const ItemTypes = {
  CLOTHING: "clothing",
};

// Clothing Item Component
const ClothingItem = ({ item }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CLOTHING,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "2px solid #444",
        padding: "8px",
        margin: "10px 0",
        textAlign: "center",
        cursor: "grab",
        backgroundColor: "#e7e7e7",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          maxWidth: "100%",
          maxHeight: "80px",
          marginBottom: "5px",
        }}
      />
      {item.name}
    </div>
  );
};

// Outfit Canvas Component
const OutfitCanvas = ({ outfit, addItem }) => {
    const [, dropRef] = useDrop(() => ({
      accept: ItemTypes.CLOTHING,
      drop: (item, monitor) => {
        const offset = monitor.getClientOffset();
        const rect = dropRef.current.getBoundingClientRect();
        addItem({
          ...item,
          x: offset.x - rect.left - 25, // Center the item relative to the drop area
          y: offset.y - rect.top - 25,
        });
      },
    }));
  
    return (
      <div
        ref={dropRef}
        style={{
          width: "300px",
          height: "600px",
          border: "3px dashed #444",
          borderRadius: "8px",
          backgroundImage: `url('https://via.placeholder.com/300x600?text=Person+Silhouette')`, // Replace with a real silhouette
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          margin: "10px auto",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {outfit.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${item.y}px`,
              left: `${item.x}px`,
              padding: "5px",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "50px",
                height: "auto",
              }}
            />
          </div>
        ))}
      </div>
    );
  };
  
// Main Outfit Builder Component
const OutfitBuilder = () => {
  const [outfit, setOutfit] = useState([]);
  const clothingItems = [
    { id: 1, name: "T-Shirt", image: "https://via.placeholder.com/80x80?text=T-Shirt" },
    { id: 2, name: "Jeans", image: "https://via.placeholder.com/80x80?text=Jeans" },
    { id: 3, name: "Jacket", image: "https://via.placeholder.com/80x80?text=Jacket" },
    { id: 4, name: "Shoes", image: "https://via.placeholder.com/80x80?text=Shoes" },
  ];

  const addItem = (item) => {
    setOutfit((prev) => [...prev, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Outfit Builder</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* Clothing Items List */}
          <div
            style={{
              width: "200px",
              padding: "10px",
              backgroundColor: "#f4f4f4",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ textAlign: "center", color: "#444" }}>Clothing Items</h3>
            {clothingItems.map((item) => (
              <ClothingItem key={item.id} item={item} />
            ))}
          </div>

          {/* Outfit Canvas */}
          <OutfitCanvas outfit={outfit} addItem={addItem} />
        </div>
      </div>
    </DndProvider>
  );
};

export default OutfitBuilder;
