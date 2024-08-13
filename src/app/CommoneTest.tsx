'use client'

import React, { useState } from 'react';
import Dropdown from "@/components/common/Dropdown";
import { useDropdownStore } from '@/store/useDropdownStore';

export default function CommoneTest() {
  const { selectedType, setSelectedType, selectedSort, setSelectedSort } = useDropdownStore();

  return (
    <>
      <h1>CommonTest</h1> 

      {/* Type Dropdown */}
      <Dropdown
        type="Type"
        selectedOption={selectedType}
        onSelect={(option) => setSelectedType(option)}
      />

      {/* Sort Dropdown */}
      <Dropdown
        type="Sort"
        selectedOption={selectedSort}
        onSelect={(option) => setSelectedSort(option)}
      />
    </>
  );
}
