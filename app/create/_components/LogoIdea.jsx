"use client"

import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Loader2Icon } from 'lucide-react'

const LogoIdea = ({formData, onHandleInputChange}) => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(formData?.idea);

    useEffect(() => {
        if (formData?.design?.title && formData?.title) {
            generateLogoDesignIdea();
        }
    }, [formData]);

    const generateLogoDesignIdea = async () => {
        try {
            setLoading(true);

            const PROMPT = Prompt.DESIGN_IDEA_PROMPT
                .replace('{logoType}', formData?.design?.title || '')
                .replace('{logoTitle}', formData?.title || '')
                .replace('{logoDesc}', formData?.desc || '')
                .replace('{logoPrompt}', formData?.design?.prompt || '');

            console.log('Sending prompt:', PROMPT);

            const result = await axios.post('/api/ai-design-ideas', {
                prompt: PROMPT
            });

            console.log('API Response:', result.data);

            // Update this line to access the prompt property
            if (result.data.ideas?.prompts) {
                const promptsArray = result.data.ideas.prompts.map(item => item.prompt || item);
                setIdeas(promptsArray);
            }
        } catch (error) {
            console.error('Error generating ideas:', error.response?.data || error.message);
            setIdeas([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='my-10'>
            <HeadingDescription
                title={Lookup.LogoIdeaTitle}
                description={Lookup.LogoIdeaDesc}
            />

            <div className='flex items-center justify-center'>
                {loading && <Loader2Icon className='animate-spin my-10' />}
            </div>

            <div className='flex flex-wrap gap-3 mt-6'>
                {Array.isArray(ideas) && ideas.map((item, index) => (
                    <h2 
                        key={index}
                        onClick={() => {
                            setSelectedOption(item);
                            onHandleInputChange(item);
                        }}
                        className={`p-2 rounded-full border px-3 cursor-pointer
                            hover:border-primary ${selectedOption === item ? 'border-primary' : ''}`}
                    >
                        {item}
                    </h2>
                ))}
                
                <h2 
                    onClick={() => {
                        setSelectedOption('Let AI Select the best idea');
                        onHandleInputChange('Let AI Select the best idea');
                    }} 
                    className={`p-2 rounded-full border px-3 cursor-pointer
                        hover:border-primary ${selectedOption === 'Let AI Select the best idea' ? 'border-primary' : ''}`}
                >
                    Let AI Select the best idea
                </h2>
            </div>
        </div>
    )
}

export default LogoIdea