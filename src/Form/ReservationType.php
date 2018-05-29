<?php

namespace App\Form;

use App\Entity\Reservation;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('screening', null, array('label' => 'Numer seansu'))
            ->add('seat', null, array('label' => 'Miejsce'))
            ->add('row', null, array('label' => 'Rząd'))
            ->add('firstname', null, array('label' => 'Imię'))
            ->add('surname', null, array('label' => 'Nazwisko'))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
        ]);
    }
}
