'use client';
import { Card } from '@/components/react-components/card';
import { SearchComponent } from '@/components/react-components/search-bar';
import { useTwios } from '@/hooks/useTwios';
import { useEffect, useState } from 'react';

export default function ExplorePage() {
  const { twios } = useTwios();
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Execute search when the page is loaded
  useEffect(() => {
    handleSearch(searchText);
  }, [])

  useEffect(() => {
    // Search after 500ms
    const delaySearch = setTimeout(() => {
      handleSearch(searchText);
    }, 500);

    // Clear timeout
    return () => clearTimeout(delaySearch);
  }, [searchText]);


  const handleSearch = (value) => {
    const text = value.toLowerCase();
    const result = [];

    for (const twio of twios) {
      const content = twio.content.toLowerCase();

      if (content.indexOf(text) !== -1) {
        result.push(twio);
      }
    }
    return setResults(result);
  };

  const onSearchText = (value) => {
    setSearchText(value);
  };

  return (
    <main className='md:w-[48rem]'>
      <SearchComponent onChange={(e) => onSearchText(e.target.value)} />

      {results.map((twio) => (
        <Card twio={twio} key={twio.id} />
      ))}
    </main>
  );
}
