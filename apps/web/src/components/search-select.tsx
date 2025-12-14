'use client';

import * as React from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// ============================================================================
// Types
// ============================================================================

export interface SearchSelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, unknown>;
}

export interface SearchSelectProps<T = string> {
  /**
   * Options to display in the select
   */
  options: SearchSelectOption<T>[];
  /**
   * Selected value
   */
  value?: T;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: T | undefined) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Custom render function for option label
   */
  renderOption?: (option: SearchSelectOption<T>) => React.ReactNode;
  /**
   * Custom render function for selected value
   */
  renderValue?: (option: SearchSelectOption<T> | undefined) => React.ReactNode;
  /**
   * Whether to show clear button
   */
  clearable?: boolean;
  /**
   * Whether to show search input
   */
  searchable?: boolean;
  /**
   * Custom filter function
   */
  filterFunction?: (
    option: SearchSelectOption<T>,
    searchQuery: string,
  ) => boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Maximum height of the options list
   */
  maxHeight?: string;
  /**
   * Width of the trigger button
   */
  width?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Additional className for trigger
   */
  triggerClassName?: string;
  /**
   * Additional className for content
   */
  contentClassName?: string;
  /**
   * Whether to group options
   */
  groupBy?: (option: SearchSelectOption<T>) => string | undefined;
  /**
   * Custom empty state component
   */
  emptyComponent?: React.ReactNode;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Default filter function - searches in label
 */
function defaultFilter<T>(
  option: SearchSelectOption<T>,
  searchQuery: string,
): boolean {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return true;
  return option.label.toLowerCase().includes(query);
}

/**
 * SearchSelect Component
 *
 * A highly customizable searchable select component built with Radix UI Popover.
 *
 * @example
 * ```tsx
 * <SearchSelect
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 *   placeholder="Select an option"
 * />
 * ```
 *
 * @example With custom rendering
 * ```tsx
 * <SearchSelect
 *   options={countries}
 *   value={country}
 *   onValueChange={setCountry}
 *   renderOption={(option) => (
 *     <div className="flex items-center gap-2">
 *       <img src={option.flag} alt={option.label} />
 *       <span>{option.label}</span>
 *     </div>
 *   )}
 * />
 * ```
 */
export function SearchSelect<T = string>({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  disabled = false,
  renderOption,
  renderValue,
  clearable = true,
  searchable = true,
  filterFunction = defaultFilter,
  emptyMessage = 'No options found',
  maxHeight = '300px',
  width,
  size = 'default',
  triggerClassName,
  contentClassName,
  groupBy,
  emptyComponent,
}: SearchSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Find selected option
  const selectedOption = React.useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value],
  );

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    let filtered = options.filter((opt) => {
      if (opt.disabled) return false;
      return filterFunction(opt, searchQuery);
    });

    // Group options if groupBy is provided
    if (groupBy) {
      const grouped = new Map<string, SearchSelectOption<T>[]>();
      filtered.forEach((opt) => {
        const group = groupBy(opt) || 'Other';
        if (!grouped.has(group)) {
          grouped.set(group, []);
        }
        grouped.get(group)!.push(opt);
      });
      return Array.from(grouped.entries()).map(([group, opts]) => ({
        group,
        options: opts,
      }));
    }

    return filtered;
  }, [options, searchQuery, filterFunction, groupBy]);

  // Reset search when popover closes
  React.useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  const handleSelect = (optionValue: T) => {
    onValueChange?.(optionValue);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(undefined);
  };

  const sizeClasses = {
    sm: 'h-8 text-sm',
    default: 'h-9 text-sm',
    lg: 'h-10 text-base',
  };

  const hasGroups = groupBy && Array.isArray(filteredOptions[0]?.options);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-haspopup='listbox'
          disabled={disabled}
          className={cn(
            'w-full justify-between font-normal',
            sizeClasses[size],
            !selectedOption && 'text-muted-foreground',
            triggerClassName,
          )}
          style={width ? { width } : undefined}
        >
          <span className='flex-1 truncate text-left'>
            {selectedOption
              ? renderValue
                ? renderValue(selectedOption)
                : selectedOption.label
              : placeholder}
          </span>
          <div className='flex items-center gap-1'>
            {clearable && selectedOption && (
              <X
                className='h-4 w-4 shrink-0 opacity-50 hover:opacity-100'
                onClick={handleClear}
              />
            )}
            <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0', contentClassName)}
        align='start'
        sideOffset={4}
        onOpenAutoFocus={(e) => e.preventDefault()}
        style={width ? { width } : undefined}
      >
        <div className='flex flex-col'>
          {/* Search Input */}
          {searchable && (
            <div className='border-b p-2'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-8'
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div
            className='overflow-y-auto p-1'
            style={{ maxHeight }}
            role='listbox'
          >
            {hasGroups ? (
              // Grouped options
              (
                filteredOptions as Array<{
                  group: string;
                  options: SearchSelectOption<T>[];
                }>
              ).map(({ group, options: groupOptions }) => (
                <div key={group} className='mb-2'>
                  <div className='px-2 py-1.5 text-xs font-semibold text-muted-foreground'>
                    {group}
                  </div>
                  {groupOptions.map((option) => (
                    <SearchSelectItem
                      key={String(option.value)}
                      option={option}
                      isSelected={option.value === value}
                      onSelect={() => handleSelect(option.value)}
                      renderOption={renderOption}
                    />
                  ))}
                </div>
              ))
            ) : // Ungrouped options
            (filteredOptions as SearchSelectOption<T>[]).length > 0 ? (
              (filteredOptions as SearchSelectOption<T>[]).map((option) => (
                <SearchSelectItem
                  key={String(option.value)}
                  option={option}
                  isSelected={option.value === value}
                  onSelect={() => handleSelect(option.value)}
                  renderOption={renderOption}
                />
              ))
            ) : (
              <div className='py-6 text-center text-sm text-muted-foreground'>
                {emptyComponent || emptyMessage}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ============================================================================
// Internal Components
// ============================================================================

interface SearchSelectItemProps<T> {
  option: SearchSelectOption<T>;
  isSelected: boolean;
  onSelect: () => void;
  renderOption?: (option: SearchSelectOption<T>) => React.ReactNode;
}

function SearchSelectItem<T>({
  option,
  isSelected,
  onSelect,
  renderOption,
}: SearchSelectItemProps<T>) {
  return (
    <div
      role='option'
      aria-selected={isSelected}
      onClick={onSelect}
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground',
        option.disabled && 'pointer-events-none opacity-50',
        isSelected && 'bg-accent text-accent-foreground',
      )}
    >
      <div className='flex flex-1 items-center gap-2'>
        {renderOption ? renderOption(option) : <span>{option.label}</span>}
      </div>
      {isSelected && (
        <Check className='h-4 w-4 shrink-0 text-primary' aria-hidden='true' />
      )}
    </div>
  );
}
