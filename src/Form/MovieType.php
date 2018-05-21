<?php

namespace App\Form;

use App\Entity\Movie;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class MovieType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
                ->add('title', null, array('attr' => array('class' => 'form-control')))
                ->add('age' , null, array('attr' => array('class' => 'form-control')))
                ->add('description', null, array('attr' => array('class' => 'form-control')))
                ->add('category', ChoiceType::class, array(
                    'choices' => $this->getCategories(),
                    'attr' => array('class' => 'form-control')
                ))
                ->add('time', null, array('attr' => array('class' => 'form-control')))
                ->add('release_date', null, array('attr' => array('class' => 'form-control')))
                ->add('grade', ChoiceType::class, array(
                    'choices' => $this->getChoices(),
                    'attr' => array('class' => 'form-control')))
                ->add('image', FileType::class, array('label' => 'Image', 'attr' => array('class' => 'form-control')))
                ->add('url', null, array('attr' => array('class' => 'form-control')))

        ;
    }

    public function configureOptions(OptionsResolver $resolver) {
        $resolver->setDefaults([
            'data_class' => Movie::class,
        ]);
    }

    public function getChoices() {
        $out = [];
        for ($i = 1; $i <= 10; $i++) {
            $out[$i] = $i;
        }
        return $out;
    }

    public function getCategories()
    {
        $categories = [
            'Dramat' => 'Dramat',
            'Horror' => 'Horror',
            'Komedia' => 'Komedia',
            'Przygodowy' => 'Przygodowy',
        ];
        return $categories;
    }


}
