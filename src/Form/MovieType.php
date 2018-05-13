<?php

namespace App\Form;

use App\Entity\Movie;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MovieType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', null , array( 'attr' => array('class' => 'form-control')))
            ->add('age', null , array( 'attr' => array('class' => 'form-control')))
            ->add('description', null , array( 'attr' => array('class' => 'form-control')))
            ->add('category', null , array( 'attr' => array('class' => 'form-control')))
            ->add('url', null , array( 'attr' => array('class' => 'form-control')))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Movie::class,
        ]);
    }
}
