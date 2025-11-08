import { useState, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	type ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onStateChange: (newState: ArticleStateType) => void;
	isOpen?: boolean; // Временная фиксация через пропс для удобства разработки
};

export const ArticleParamsForm = ({
	articleState,
	onStateChange,
	isOpen: isOpenProp,
}: ArticleParamsFormProps) => {
	// Состояние открытия/закрытия панели
	const [isOpen, setIsOpen] = useState(isOpenProp ?? false);
	
	// Внутреннее состояние формы для предпросмотра изменений
	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	// Синхронизация внутреннего состояния формы с переданным состоянием статьи
	useEffect(() => {
		setFormState(articleState);
	}, [articleState]);

	// Синхронизация состояния открытия с пропсом (если передан)
	useEffect(() => {
		if (isOpenProp !== undefined) {
			setIsOpen(isOpenProp);
		}
	}, [isOpenProp]);

	const handleToggle = () => {
		if (isOpenProp === undefined) {
			setIsOpen((prev) => !prev);
		}
	};

	const handleFontFamilyChange = (option: typeof fontFamilyOptions[0]) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: typeof fontSizeOptions[0]) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: typeof fontColors[0]) => {
		setFormState((prev) => ({
			...prev,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (
		option: typeof backgroundColors[0]
	) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: typeof contentWidthArr[0]) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: option,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onStateChange(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onStateChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						placeholder='Выберите шрифт'
					/>

					

					<RadioGroup
					name='Размер шрифта'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					
					/>

				

					<Select
						title='Цвет текста'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						placeholder='Выберите цвет текста'
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>

		

					<Select
					
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
