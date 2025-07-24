"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  size = 'md',
  searchable = false,
  multiple = false,
  clearable = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple ? (value ? [value] : []) : []
  );
  
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      
      setSelectedValues(newSelectedValues);
      onChange?.(newSelectedValues.join(','));
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      setSelectedValues([]);
      onChange?.("");
    } else {
      onChange?.("");
    }
  };

  const selectClasses = cn(
    "relative w-full border border-gray-300 bg-white rounded-md shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:border-gray-600 dark:bg-gray-800",
    {
      'opacity-50 cursor-not-allowed': disabled,
      'h-8 text-sm': size === 'sm',
      'h-10 text-base': size === 'md',
      'h-12 text-lg': size === 'lg',
    },
    className
  );

  const buttonClasses = cn(
    "w-full flex items-center justify-between px-3 py-2 text-left",
    {
      'py-1 px-2': size === 'sm',
      'py-2 px-3': size === 'md',
      'py-3 px-4': size === 'lg',
    }
  );

  return (
    <div ref={selectRef} className={selectClasses}>
      <button
        type="button"
        className={buttonClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="flex items-center">
          {selectedOption?.icon && (
            <span className="mr-2">{selectedOption.icon}</span>
          )}
          <span className={cn("block truncate", {
            'text-gray-500 dark:text-gray-400': !selectedOption,
            'text-gray-900 dark:text-white': selectedOption,
          })}>
            {selectedOption?.label || placeholder}
          </span>
        </span>
        
        <div className="flex items-center">
          {clearable && (selectedOption || selectedValues.length > 0) && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          <svg
            className={cn("w-5 h-5 text-gray-400 transition-transform", {
              'rotate-180': isOpen
            })}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600">
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <input
                ref={searchRef}
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = multiple 
                  ? selectedValues.includes(option.value)
                  : option.value === value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      {
                        'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400': isSelected,
                        'text-gray-400 cursor-not-allowed': option.disabled,
                        'text-gray-900 dark:text-white': !option.disabled && !isSelected,
                      }
                    )}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                  >
                    {multiple && (
                      <div className={cn("mr-3 w-4 h-4 border rounded flex items-center justify-center", {
                        'bg-blue-600 border-blue-600': isSelected,
                        'border-gray-300 dark:border-gray-600': !isSelected,
                      })}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                    
                    {option.icon && (
                      <span className="mr-2">{option.icon}</span>
                    )}
                    
                    <span className="block truncate">{option.label}</span>
                    
                    {!multiple && isSelected && (
                      <svg className="ml-auto w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}